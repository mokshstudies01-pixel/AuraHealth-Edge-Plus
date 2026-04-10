FROM nginx:alpine

# Cloud Run sets the PORT variable, which Nginx Alpine handles via templates
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the static web application files
COPY public/ /usr/share/nginx/html/

# The base nginx alpine image automatically runs envsubst on startup
