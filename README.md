# qrcode

Bulk QR code generator in NodeJS

Terminal variables:

-   -d: Data file.
-   -u: URL.
-   -n: Number of codes to be generated.
-   -o: Options: type, margin, width

Example:

```
node main.js -u https://12345.012345.com/qr.html?s="{length: 16}" -n 200 -o "type: svg, margin:1, width: 200"
```
