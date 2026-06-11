# ============================================================
# Serve pre-built static files with nginx
#
# The static export (npm run build) is performed on the CI runner
# natively (amd64) to avoid QEMU arm64 emulation crashes during
# Next.js SSG. Static HTML/CSS/JS is architecture-independent,
# so nginx can serve the same files on any platform.
# ============================================================
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy pre-built static export (mounted from CI)
COPY out/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
