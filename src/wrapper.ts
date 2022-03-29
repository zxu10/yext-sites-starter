export const reactWrapper = (
  data: any,
  name: string,
  filename: string,
  template: string,
  hydrate: boolean
): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Page Usings Plugin</title>
        <script>window.__INITIAL__DATA__ = ${JSON.stringify(data)}</script>
    </head>
    <body>
        <div id="reactele">${template}</div>${hydrate ? `<script type="module" src="/assets/hydrate/${getHydrationFilename(filename, data)}.js" defer></script>` : ""
    }
    </body>
    </html>`;
};

const getHydrationFilename = (name: string, data: any) => {
  const { __meta } = data;
  for (const [file, info] of Object.entries(
    __meta.manifest.bundlerManifest
  )) {
    if (file !== `.yext/hydration_templates/${name}`) {
      continue;
    }
    const originalFile = (info as any).file;
    const filenameIndex = originalFile.lastIndexOf("/") + 1;
    const filename = originalFile.substring(filenameIndex);
    return filename.split(".").slice(0, -1).join(".");
  }
};