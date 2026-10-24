/**
 * Bulletproof PDF downloader utility for MOD FORGE Company Brochure.
 * Uses client-side Blob generation with fallback to ensure
 * browsers inside sandboxed iframes download the actual binary PDF file (936 KB)
 * instead of a 0-byte or empty file.
 */

export async function downloadBrochurePdf(
  onProgress?: (status: "loading" | "success" | "error", message?: string) => void
): Promise<boolean> {
  const primaryUrl = "/assets/aistudio/MF-Brochure_-_mod_forge_profile_bfde509e.pdf";
  const fallbackUrl = "/mod_forge_brochure.pdf";
  const filename = "MOD_FORGE_Company_Brochure.pdf";

  if (onProgress) {
    onProgress("loading", "Fetching company brochure (936 KB)...");
  }

  try {
    // Attempt primary URL first, then fallback
    let response = await fetch(primaryUrl).catch(() => null);
    if (!response || !response.ok) {
      response = await fetch(fallbackUrl).catch(() => null);
    }

    if (!response || !response.ok) {
      throw new Error(`Failed to fetch PDF from server (HTTP ${response?.status || "network error"})`);
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      throw new Error("Received empty buffer from server");
    }

    // Create explicit application/pdf Blob
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    // Method 1: Object URL trigger
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = blobUrl;
    link.download = filename;
    link.setAttribute("download", filename);
    link.target = "_self";
    
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);

    if (onProgress) {
      onProgress("success", "Download completed successfully!");
    }
    return true;
  } catch (err: any) {
    console.error("Blob download failed, trying direct link fallback:", err);
    
    // Method 2: Direct navigation fallback
    try {
      const fallbackLink = document.createElement("a");
      fallbackLink.href = primaryUrl;
      fallbackLink.download = filename;
      fallbackLink.target = "_blank";
      fallbackLink.rel = "noopener noreferrer";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
      
      if (onProgress) {
        onProgress("success", "Opened PDF in new browser tab.");
      }
      return true;
    } catch (fallbackErr: any) {
      if (onProgress) {
        onProgress("error", "Unable to download PDF. Please check browser pop-up permissions.");
      }
      return false;
    }
  }
}
