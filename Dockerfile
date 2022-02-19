FROM denoland/deno:alpine-1.18.2 as builder

EXPOSE 9000
EXPOSE 9001
EXPOSE 9002

WORKDIR /app

USER deno

COPY . .

FROM builder as nightly
ENV PORT=9001
ENV API_BASE=https://nightly.api.maintained.cc
RUN deno cache main.ts
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]

FROM builder as production
ENV PORT=9000
ENV API_BASE=https://api.maintained.cc
RUN deno cache main.ts
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]