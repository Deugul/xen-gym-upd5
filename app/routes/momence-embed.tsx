import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 100%; font-family: sans-serif; }
  </style>
</head>
<body>
  <div id="ribbon-schedule"></div>
  <script
    async
    type="module"
    host_id="230727"
    teacher_ids="[]"
    location_ids="[]"
    tag_ids="[]"
    default_filter="show-all"
    locale="en"
    src="https://momence.com/plugin/host-schedule/host-schedule.js"
  ></script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
};
