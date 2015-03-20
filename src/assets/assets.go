package assets
import (
    "html/template"
    "net/http"
    "time"
    "../env"
    "../assets/debug"
)

func ParseAsset(path string) (*template.Template, error) {
    src, err := getData(path)
    if err != nil {
        return nil, err
    }
    return template.New(time.Now().String()).Parse(string(src))
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
        return Asset("assets/" + path)
    }
    return debug.Asset("assets/" + path)
}