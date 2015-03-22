ふ〜どふぁいんだ〜

# 禁止事項

## assets内のファイルに ``` logo ``` という文字列を含むファイルを作ること

なぜか、 ``` logo ``` という文字列を含むファイルは ``` go-bindata ``` の処理対象外となってしまう.
謎すぎる・・・

# ビルド

## ビルドの事前準備

[ここ](http://qiita.com/Jxck_/items/02185f51162e92759ebe#2-2)を参考に事前準備をしておく.

## ビルド実行

```
$ GOOS=linux GOARCH=amd64 go build -o ff src/main.go
```

