# Nanzhuang Fragrance

南庄桂花香氛概念館的 Next.js 14 App Router 電商前端原型，使用 TypeScript、Tailwind CSS、Framer Motion、React Hook Form 與 Zod。

## 本機開發

```bash
npm install
npm run dev
```

開啟 <http://localhost:3000>。

## 專案結構

```text
app/
  checkout/                 購物車與結帳
  journal/                  南庄慢誌列表與文章
  products/[id]/             商品詳情
  layout.tsx                 全站字型、導覽與狀態 Provider
  page.tsx                    品牌首頁
components/
  checkout/                  結帳表單與驗證
  layout/                    Navbar、Footer
  products/                  商品詳情互動
  quiz/                      慢城尋香測驗
  store/                     語系與購物車狀態
lib/                         商品、文章資料
public/images/               本地 SVG 圖片 fallback
render.yaml                  Render Blueprint
```

購物車與語系狀態保存在瀏覽器 localStorage。付款、物流門市、LINE / Google 登入與訂單送出目前是可操作的展示流程，尚未連接外部服務。正式交易前需加入對應服務商 API、Webhook 與訂單資料庫。

## Render 部署

可從 Render Dashboard 建立 Blueprint，選取此 repository 的 `render.yaml`。服務使用 `npm install && npm run build` 建置，並以 `npm run start` 啟動；Next.js 會讀取 Render 注入的 `PORT`。部署前可複製 `.env.example`，並在 Render 設定正式站點 URL。

也可手動建立 Node Web Service：

- Build command：`npm install && npm run build`
- Start command：`npm run start`
- Health check path：`/`

## 檢查

```bash
npm run lint
npm run typecheck
npm run build
```
