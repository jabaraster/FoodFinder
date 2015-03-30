package webutil

import (
    "net/http"
    "../assets"
    "../env"
    "encoding/json"

    "html/template"
)

func WriteBasicLayoutHtml(w http.ResponseWriter, r *http.Request, htmlPath string, data interface{}) {
    tmpl, err := assets.ParseBasicLayoutHtml(htmlPath)
    if err != nil {
        if env.IsDebugMode() {
            panic(err)
        }
        http.NotFound(w, r)
        return
    }
    tmpl.ExecuteTemplate(w, "base", nil)
}

func WriteTemplateResponse(w http.ResponseWriter, r *http.Request, templatePath string,  data interface{}) {
    tmpl, err := assets.ParseAsset(templatePath)
    if err != nil {
        http.NotFound(w, r)
        return
    }
    err = tmpl.Execute(w, data)
    if err != nil {
        panic(err)
    }
}

func WriteJsonResponse(w http.ResponseWriter, data interface{}) error {
    b, e := json.Marshal(data)
    if e != nil {
        return e
    }
    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    _, e2 := w.Write(b)
    return e2
}
func ViewHandler(w http.ResponseWriter, r *http.Request) {
    funcMap := template.FuncMap{
        "safehtml": func(text string) template.HTML { return template.HTML(text) },
    }
    templates := template.Must(template.New("").Funcs(funcMap).ParseFiles("templates/base.html",
    "templates/view.html"))
    dat := struct {
        Title string
        Body  string
    }{
        Title: "メイジェイって",
        Body:  "いっつも<b>ありのまま</b>だよね",
    }
    err := templates.ExecuteTemplate(w, "base", dat)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}