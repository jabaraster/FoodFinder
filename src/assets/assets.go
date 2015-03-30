package assets
import (
    "html/template"
    "net/http"
    "../env"
    "../bindata"
    "../bindata/debug"
)

func ParseBasicLayoutHtml(htmlPath string) (*template.Template, error) {
    baseData, err := getData("html/basic-layout.html")
    if err != nil {
        return nil, err
    }
    contentsData, err2 := getData(htmlPath)
    if err2 != nil {
        return nil, err
    }
    tmpl := template.Must(template.New("base").Parse(string(baseData)))
    return tmpl.New("contents").Parse(string(contentsData))
}

func BasicLayoutHtmlHandler(htmlPath string) http.Handler {
    return &basicLayoutHtmlHandler{htmlPath}
}

type basicLayoutHtmlHandler struct {
    htmlPath string
}

func (h *basicLayoutHtmlHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    baseData, err := getData("html/basic-layout.html")
    if err != nil {
        panic(err)
    }
    contentsData, err2 := getData(h.htmlPath)
    if err2 != nil {
        panic(err2)
    }
    tmpl := template.Must(template.New("base").Parse(string(baseData)))
    tmpl = template.Must(tmpl.New("contents").Parse(string(contentsData)))
    err3 := tmpl.ExecuteTemplate(w, "base", nil)
    if err3 != nil {
        panic(err3)
    }
}

func ParseAsset(path string) (*template.Template, error) {
    src, err := getData(path)
    if err != nil {
        return nil, err
    }
    return template.New(path).Parse(string(src))
}

func CssHandler(w http.ResponseWriter, r *http.Request) {
    data, err := getData(r.URL.Path[1:])
    if err != nil {
        if env.IsDebugMode() {
            panic(err)
        } else {
            http.NotFound(w, r)
        }
        return
    }
    w.Header().Add("content-type", "text/css") // これ大事！
    _, err2 := w.Write(data)
    if err2 != nil {
        if env.IsDebugMode() {
            panic(err)
        } else {
            http.NotFound(w, r)
        }
        return
    }
}

func ContentTypeHandler(contentType string) http.Handler {
    return &contentTypeHandler{contentType}
}

type contentTypeHandler struct {
     contentType string
}

func (h *contentTypeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    data, err := getData(r.URL.Path[1:])
    if err != nil {
        if env.IsDebugMode() {
            panic(err)
        } else {
            http.NotFound(w, r)
        }
        return
    }
    w.Header().Add("content-type", h.contentType)
    _, err2 := w.Write(data)
    if err2 != nil {
        if env.IsDebugMode() {
            panic(err)
        } else {
            http.NotFound(w, r)
        }
        return
    }
}

func AssetsHandler(w http.ResponseWriter, r *http.Request) {
    data, err := getData(r.URL.Path[1:])
    if err != nil {
        panic(err)
    }
    _, err2 := w.Write(data)
    if err2 != nil {
        panic(err2)
    }
}

func getData(path string) ([]byte, error) {
    if env.IsProductionMode() {
        return bindata.Asset("assets/" + path)
    }
    return debug.Asset("assets/" + path)
}
