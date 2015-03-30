package assets
import (
    "html/template"
    "net/http"
    "../env"
    "../bindata"
    "../bindata/debug"
    "os"
    "time"
    "fmt"
    "strings"
    "strconv"
)

const (
    assetsFileDelimiter = "___"
)

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

    funcMap := template.FuncMap{
        "css": cssTagOutputer,
    }

    tmpl := template.Must(template.New("base").Funcs(funcMap).Parse(string(baseData)))
    tmpl = template.Must(tmpl.New("contents").Parse(string(contentsData)))
    tmpl.Funcs(funcMap)

    err3 := tmpl.ExecuteTemplate(w, "base", nil)
    if err3 != nil {
        panic(err3)
    }
}

func cssTagOutputer(text string) template.HTML {
    cssInfo := mustGetInfo(text[1:])
    base := time.Date(1900, time.January, 1, 0, 0, 0, 0, time.UTC)
    descriptor := cssInfo.ModTime().Sub(base).Nanoseconds()
    tag := fmt.Sprintf("<link rel=\"stylesheet\" href=\"%s%s%d\" type=\"text/css\">", text, assetsFileDelimiter, descriptor)
    return template.HTML(tag)
}

func ParseAsset(path string) (*template.Template, error) {
    src, err := getData(path)
    if err != nil {
        return nil, err
    }
    return template.New(path).Parse(string(src))
}

func ContentTypeHandler(contentType string) http.Handler {
    return &contentTypeHandler{contentType}
}

type contentTypeHandler struct {
     contentType string
}

func extractFilePath(r *http.Request) *assetFile {
    originalPath := r.URL.Path[1:];
    tokens := strings.Split(originalPath, assetsFileDelimiter)

    switch (len(tokens)) {
        case 1:
            return &assetFile{tokens[0], false, 0}
        case 2:
            i, err := strconv.ParseInt(tokens[1], 10, 64)
            if err != nil {
                panic(err)
            }
            return &assetFile{tokens[0], true, i}
    }
    panic(originalPath)
}

type assetFile struct {
    filePath string
    cacheable bool
    delimiter int64
}

func (h *contentTypeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    asset := extractFilePath(r)

    data, err := getData(asset.filePath)
    if err != nil {
        if env.IsDebugMode() {
            panic(err)
        } else {
            http.NotFound(w, r)
        }
        return
    }
    w.Header().Add("content-type", h.contentType)
    if asset.cacheable {
        cacheSeconds := 60 * 60 * 24 * 365 // 1年間キャッシュを有効にする
        w.Header().Add("cache-control", "max-age=" + strconv.Itoa(cacheSeconds))
    }

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

func mustGetData(path string) []byte {
    d, e := getData(path)
    if e != nil {
        panic(e)
    }
    return d
}

func mustGetInfo(path string) os.FileInfo {
    f,e := bindata.AssetInfo("assets/" + path)
    if e != nil {
        panic(e)
    }
    return f
}