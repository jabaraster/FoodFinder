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
func handleInclude(w http.ResponseWriter, r *http.Request) {
    webutil.WriteBasicLayoutHtml(w, r, "html/main.html", nil)
}

func main() {
    env.Dump()

    goji.Get("", http.RedirectHandler("/", http.StatusSeeOther))
    goji.Get("/", handler)

    goji.Get("/include", assets.BasicLayoutHtmlHandler("html/main.html"))

    goji.Get("/css/*", assets.ContentTypeHandler("text/css"))
    goji.Get("/js/*", assets.ContentTypeHandler("text/javascript"))
    goji.Get(regexp.MustCompile("/img/.*\\.jpg"), assets.ContentTypeHandler("image/jpeg"))
    goji.Get(regexp.MustCompile("/img/.*\\.png"), assets.ContentTypeHandler("image/png"))

    goji.Serve()
}
