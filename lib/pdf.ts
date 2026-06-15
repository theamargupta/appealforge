/**
 * Client-side PDF export of the appeal letter (the "downloadable report" requirement).
 * Uses jsPDF — no server round-trip, so the letter never leaves the user's browser.
 */

import { jsPDF } from "jspdf";
import { siteConfig } from "@/config/site";

interface PdfArgs {
  letter: string;
  insurer: string;
  procedure: string;
}

export function downloadAppealPdf({ letter, insurer, procedure }: PdfArgs): void {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const marginX = 56;
  const marginTop = 64;
  const lineHeight = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = doc.internal.pageSize.getWidth() - marginX * 2;

  doc.setFont("times", "normal");
  doc.setFontSize(11);

  let y = marginTop;
  const lines = doc.splitTextToSize(letter, maxWidth) as string[];

  for (const line of lines) {
    if (y > pageHeight - marginTop) {
      doc.addPage();
      y = marginTop;
    }
    doc.text(line, marginX, y);
    y += lineHeight;
  }

  // Footer attribution on the last page.
  doc.setFontSize(8);
  doc.setTextColor(140);
  doc.text(
    `Generated with ${siteConfig.name} — ${siteConfig.url}. Review with a licensed professional before sending.`,
    marginX,
    pageHeight - 28,
  );

  const safe = (s: string) => s.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  doc.save(`appeal-${safe(insurer)}-${safe(procedure)}.pdf`.slice(0, 80));
}
