package main

import (
    "regexp"
    "net/http"

    "github.com/zenazn/goji"

    "./assets"
    "./env"
    "./webutil"
)

func handler(w http.ResponseWriter, r *http.Request) {
    webutil.WriteTemplateResponse(w, r, "html/index.html", nil)
}

func main() {
    env.Dump()

    goji.Get("/", handler)

    goji.Get("/css/*", assets.ContentTypeHandler("text/css"))
    goji.Get("/js/*", assets.ContentTypeHandler("text/javascript"))
    goji.Get(regexp.MustCompile("/img/.*\\.jpg"), assets.ContentTypeHandler("image/jpeg"))
    goji.Get(regexp.MustCompile("/img/.*\\.png"), assets.ContentTypeHandler("image/png"))

    goji.Serve()
}
