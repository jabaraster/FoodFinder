package testpage

import (
    "net/http"

    "../env"
    "../webutil"
)

func HandleGet(w http.ResponseWriter, r *http.Request) {
    if env.IsDebugMode() {
        webutil.WriteTemplateResponse(w, r, "html/test-page.html", nil)
    } else {
        http.RedirectHandler("/", http.StatusSeeOther).ServeHTTP(w, r)
    }
}
