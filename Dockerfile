FROM mynode
ARG URL
ARG APP_URL
ENV NUXT_PUBLIC_BASE_URL=${URL}
ENV NUXT_APP_BASE_URL=${APP_URL}
WORKDIR /nuxt 
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm i
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"] 
