const fs = require("fs");
const path = require("path");

// Path to the docs folder and redirects.json
const docsDir = path.join(__dirname, "docs");
const redirectsFile = path.join(__dirname, "redirects.json");

// Load the redirects data
const redirects = JSON.parse(fs.readFileSync(redirectsFile, "utf-8"));

// Helper function to generate HTML for a redirect
const generateHTML = (targetURL) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="refresh" content="0;url=${targetURL}" />
  <script type="text/javascript">window.location.href = "${targetURL}";</script>
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${targetURL}">${targetURL}</a></p>
</body>
</html>
`;

// Ensure docs directory is clean
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}
fs.mkdirSync(docsDir);

// Generate HTML files for each redirect
Object.entries(redirects).forEach(([shortURL, targetURL]) => {
  const filePath = path.join(docsDir, `${shortURL}.html`);
  const fileDir = path.dirname(filePath);

  // Ensure the directory structure exists
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }

  // Write the redirect HTML
  fs.writeFileSync(filePath, generateHTML(targetURL), "utf-8");
  console.log(`Generated ${filePath}`);
});

console.log("All redirects generated successfully!");
