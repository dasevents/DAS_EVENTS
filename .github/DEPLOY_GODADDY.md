# GoDaddy Deployment Setup

## GitHub Secrets Required

Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name        | Value                                      | Where to find it                          |
|--------------------|--------------------------------------------|-------------------------------------------|
| `FTP_HOST`         | Your FTP hostname                          | GoDaddy → Hosting → Settings → FTP        |
| `FTP_USERNAME`     | Your FTP username                          | GoDaddy → Hosting → Settings → FTP        |
| `FTP_PASSWORD`     | Your FTP password                          | GoDaddy → Hosting → Settings → FTP        |

## GoDaddy FTP Details

1. Log in to [GoDaddy](https://dcc.godaddy.com)
2. Go to **My Products → Hosting → Manage**
3. Click **Settings → FTP Access** or **File Manager → FTP Accounts**
4. Note your:
   - **FTP Hostname** (usually your domain or `ftp.yourdomain.com`)
   - **FTP Username** (your cPanel username)
   - **FTP Password** (your cPanel password)

## PHP Config on GoDaddy

After deployment, you need to create `config.php` on the server:

1. Go to GoDaddy File Manager → `public_html/api/`
2. Copy `config.example.php` to `config.php`
3. Edit `config.php` with your SMTP credentials:
   - For GoDaddy email: `smtpout.secureserver.net` port `465` SSL
   - For Gmail: `smtp.gmail.com` port `587` TLS (use app password)

## Deployment

Once secrets are set, the workflow runs automatically on every push to `main`.

You can also trigger it manually from **Actions → Deploy to GoDaddy → Run workflow**.

## Troubleshooting

- **FTP fails**: Check that FTP is enabled in GoDaddy hosting settings
- **403/500 errors**: Ensure `public_html` permissions are `755` for folders and `644` for files
- **Contact form not working**: Verify `api/config.php` exists on the server with correct SMTP credentials
