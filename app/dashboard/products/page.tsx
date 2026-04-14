// import Header from "@/components/Header/Header";
// interface Props {
//     params: { id: string };
// }

//  <td
//                                     className="p-2 font-medium cursor-pointer hover:text-blue-600"

//                                     onClick={() => toggleExpand(p._id)}>
//                                       {expandedId === p._id ? "▼" : "▶"}
//                                        {p.name}
//                                   </td>
"use client";
import { useState } from "react";
import Link from "next/link";
import AddProductDialog from "./AddProductDialog";
import { Pencil, Trash2 } from "lucide-react"
import { useEffect } from "react"
type Variant = {
  id: string
  cpu: string
  ram: string
  ssd: string
  price: number
}

type Product = {
  _id: string
  name: string
  mainImage: string
  gallery: string[]
  createdAt: string
  variants: Variant[]
  brand?: {
    name: string
  }
}

export default function ProductDetail() {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)
  const [total, setTotal] = useState(0)


  const totalPages = Math.ceil(total / limit)

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)
  useEffect(() => {
    fetch(`/api/products?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setTotal(data.total)
      })
  }, [page, limit])

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }


  console.log("products",products)

  return (
    <>
      <section className="containerKV">
        <div className="kv-header-top">
          <div className="kv-header-logo">
            <a
              href="javascript:;"
              className="mobileMenu kv-btn kv-btn-icon-only kv-btn-text-primary"
            >
              <span />
            </a>
            {/* ngIf: $root.usecustomlogo */}
            {/* ngIf: !$root.usecustomlogo && !$root.retailerInfo.Setting.HideKVInfo && $root.appBranding.IsOriginal */}
            <a
              ng-if="!$root.usecustomlogo && !$root.retailerInfo.Setting.HideKVInfo && $root.appBranding.IsOriginal"
              href="https://www.kiotviet.vn/"
              className="kv-logo-wrapper ng-scope"
              tabIndex={-1}
              rel="noopener"
              target="_blank"
            >
              <img
                ng-src="https://logo.kiotviet.vn/KiotViet-Logo-Horizontal.svg"
                alt="Phần mềm quản lý bán hàng"
                className="kv-logo"
                title="Phần mềm quản lý bán hàng"
                src="https://logo.kiotviet.vn/KiotViet-Logo-Horizontal.svg"
              />
            </a>
            {/* end ngIf: !$root.usecustomlogo && !$root.retailerInfo.Setting.HideKVInfo && $root.appBranding.IsOriginal */}
            {/* Logo Keivi version */}
            {/* ngIf: !$root.usecustomlogo && !$root.retailerInfo.Setting.HideKVInfo && !$root.appBranding.IsOriginal */}
          </div>
          <div className="kv-navbar kv-navbar-top">
            <ul className="kv-navbar-list">
              <li
                ng-if="$root.kvManAppV2Toggle"
                uib-dropdown=""
                className="kv-navbar-item kv-navbar-user ng-scope dropdown"
                ng-mouseover="loadAccountMain()"
              >
                <a
                  href="javascript:void(0)"
                  uib-dropdown-toggle=""
                  className="kv-btn kv-btn-icon-only kv-btn-light-primary dropdown-toggle"
                  title="qua"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user icon-btn" />
                </a>
                <div
                  className="dropdown-content show-left dropdown-menu"
                  uib-dropdown-menu=""
                  ng-show="showUserMenu"
                  id="account-main"
                />
              </li>
              {/* end ngIf: $root.kvManAppV2Toggle */}
              {/* ngIf: !$root.kvManAppV2Toggle */}
            </ul>
          </div>
        </div>


      </section>
      <nav className="kv-navbar kv-navbar-main">
        <section className="containerKV kv-navbar-container">

          <ul className="kv-navbar-list">

            {/* Tổng quan */}
            <li className="kv-navbar-item">
              <Link href="/dashboard" className="kv-nav-link">
                <span>Tổng quan</span>
              </Link>
            </li>

            {/* Hàng hóa */}
            <li className="kv-navbar-item kv-dropdown">
              <span className="kv-nav-link">Hàng hóa</span>

              {/* <ul className="kv-dropdown-list">
              <li>
                <Link href="/products" className="kv-dropdown-link">
                  Danh sách hàng hóa
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="kv-dropdown-link">
                  Chuyển hàng
                </Link>
              </li>
              <li>
                <Link href="/purchase" className="kv-dropdown-link">
                  Nhập hàng
                </Link>
              </li>
            </ul> */}
            </li>

            {/* Đơn hàng */}
            <li className="kv-navbar-item kv-dropdown">
              <span className="kv-nav-link">Đơn hàng</span>

              {/* <ul className="kv-dropdown-list">
              <li>
                <Link href="/orders" className="kv-dropdown-link">
                  Đặt hàng
                </Link>
              </li>
              <li>
                <Link href="/invoices" className="kv-dropdown-link">
                  Hóa đơn
                </Link>
              </li>
              <li>
                <Link href="/returns" className="kv-dropdown-link">
                  Trả hàng
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="kv-dropdown-link">
                  Vận đơn
                </Link>
              </li>
            </ul> */}
            </li>

            {/* Khách hàng */}
            <li className="kv-navbar-item">
              <Link href="/customers" className="kv-nav-link">
                Khách hàng
              </Link>
            </li>

            {/* Bán online */}
            <li className="kv-navbar-item">
              <Link href="/online" className="kv-nav-link">
                Bán online
              </Link>
            </li>

          </ul>
          <ul className="kv-navbar-list">
            <li className="kv-navbar-item kv-navbar-item-light ng-scope">
              <a
                className="kv-nav-link"
                onClick={() => setOpen(true)}
              // href="https://giahuystore1.kiotviet.vn/sale/"
              >
                <span className="ng-binding">Thêm hàng</span>
              </a>
            </li>
          </ul>

          {/* Right side */}
          {/* <ul className="kv-navbar-list">
          <li className="kv-navbar-item kv-navbar-item-light">
            <a
              href="https://giahuystore1.kiotviet.vn/sale/"
              target="_blank"
              className="kv-nav-link"
            >
              Bán hàng
            </a>
          </li>
        </ul> */}

        </section>
      </nav>
      <section className="containerKV main_wrapper ng-scope kma-wrapper">
        <div className="kv-header-actions ng-scope">
          <h1 className="kv-heading-page">
            <span className="ng-binding">Hàng hóa</span>
          </h1>
          <article className="kv-header-filter header-filter header-filter-product headerContent columnViewTwo">
            <div className="kv-header-filter-search header-filter-search">
              <div className="input-group focus">
                <input
                  type="text"
                  placeholder="Theo mã, tên hàng"
                  className="form-control input-focus"
                  id="inputQuickSearch"
                />

                {/* <div
                  id="divSuggestProductForQuickSearchProduct"
                  style={{ flex: "1 1 auto", paddingLeft: "2.9rem" }}
                >
                  <div className="form-control">
                    Theo mã, tên hàng
                  </div>
                </div> */}

                {/* <div className="input-group-append dropdown">
                  <button
                    type="button"
                    id="idDropdownBtnSearch"
                    className="btn-icon dropdown-toggle"
                  >
                    <i className="ikr ik-sliders-simple" />
                  </button>

                  <div
                    id="idDropdownMenuSearch"
                    className="dropdown-content dropdown-menu"
                  >
                    <div className="input-search-list">

                      <div className="form-group">
                        <input
                          className="kv-form-control"
                          type="text"
                          placeholder="Theo mã, tên hàng"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          className="kv-form-control"
                          type="text"
                          placeholder="Theo Serial/IMEI"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          className="kv-form-control"
                          type="text"
                          placeholder="Theo lô, hạn sử dụng"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          className="kv-form-control"
                          type="text"
                          placeholder="Theo ghi chú, mô tả đặt hàng"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          className="kv-form-control"
                          type="text"
                          placeholder="Theo hãng sản xuất"
                        />
                      </div>

                    </div>

                    <div className="kv-window-footer">
                      <button
                        type="button"
                        className="kv-btn kv-btn-primary"
                      >
                        <span className="text-btn">Tìm kiếm</span>
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </article>
        </div>

      </section>
      <div className="main main-content ng-scope">
        <section className="mainLeft kv-sidebar kv-sidebar-filter" kv-side-bar="">
        </section>
        <section className="mainRight kv-view-detail">
          <section className="mainWrap">
            <article className="k-gridNone productList k-grid-Scroll k-scroll">
              <div id="products" className="kv-table kv-table-main k-grid k-widget multicheck-added" >
                <div className="k-grid-header" style={{ paddingRight: "8px" }}>
                  <div className="k-grid-header-wrap k-auto-scrollable" data-role="resizable" >
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-blue-100 text-left" >
                          <tr>
                            <th className="p-2">  <input type="checkbox" /></th>
                            <th className="p-2">
                              <button>
                                <i className="far fa-star" />
                              </button>
                            </th>
                            <th className="p-2">Ảnh</th>
                            <th className="p-2">Tên</th>
                            <th className="p-2">Giá</th>
                            <th className="p-2">Cấu hình</th>
                            <th className="p-2">Ngày</th>
                            <th className="p-2">Hành động</th>
                          </tr>
                        </thead>

                        <tbody>
                          {products.map((p) => {
                            console.log("p", p)
                            const first = p.variants[0]
                            const more = p.variants.length - 1

                            return (
                              <>
                                {/* ROW */}
                                <tr
                                  key={p._id}
                                  className="border-b border-gray-200 hover:bg-gray-200 cursor-pointer table-row-custom"
                                >
                                  <td className="p-2">
                                    <input type="checkbox" />
                                  </td>

                                  <td className="p-2"> <button>
                                    <i className="far fa-star" />
                                  </button></td>

                                  <td className="p-2">
                                    <img
                                      src={p.mainImage || "https://via.placeholder.com/60"}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                  </td>

                                  <td
                                    className="p-2 font-medium cursor-pointer hover:text-blue-600"

                                    onClick={() => toggleExpand(p._id)}>
                                    {expandedId === p._id ? "▼" : "▶"}
                                    {p.name}
                                  </td>
                                  <td className="p-2 text-red-500">
                                    {first?.price?.toLocaleString() || 0} đ
                                  </td>

                                  <td className="p-2">
                                    {first
                                      ? `${first.cpu} / ${first.ram} / ${first.ssd}`
                                      : "Không có"}
                                    {more > 0 && ` (+${more})`}
                                  </td>

                                  <td className="p-2">
                                    {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                                  </td>

                                  <td className="p-2">
                                    <div className="flex gap-2 items-center justify-center">
                                      <button className="flex items-center gap-1 px-2 py-1 text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
                                        <Pencil className="w-4 h-4" />
                                        Sửa
                                      </button>

                                      <button className="flex items-center gap-1 px-2 py-1 text-red-600 bg-red-50 rounded hover:bg-red-100">
                                        <Trash2 className="w-4 h-4" />
                                        Xóa
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                {/* EXPAND */}
                                {expandedId === p._id && (
                                  <tr>
                                    <td colSpan={8} className="p-4 bg-gray-100">
                                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">

                                        <div className="flex gap-6">

                                          {/* IMAGE */}
                                          <div className="w-48 h-48 flex-shrink-0">
                                            <img
                                              src={p.mainImage || "https://via.placeholder.com/150"}
                                              className="w-full h-full object-cover rounded-md border"
                                            />
                                          </div>

                                          {/* INFO */}
                                          <div className="flex-1">

                                            {/* NAME */}
                                            <h2 className="text-xl font-semibold pb-2 mb-2 border-b border-gray-200">
                                              {p.name}
                                            </h2>

                                            {/* BRAND */}
                                            <div className="mb-3">
                                              <span className="text-sm text-gray-500">Thương hiệu:</span>{" "}
                                              <span className="inline-block text-sm bg-gray-100 px-2 py-1 rounded font-medium">
                                                {p.brand?.name || "-"}
                                              </span>
                                            </div>

                                            {/* CONFIG TITLE */}
                                            <p className="font-medium mb-2">Cấu hình:</p>

                                            {/* VARIANTS */}
                                            <div className="space-y-2">
                                              {p.variants.map((v) => (
                                                <div
                                                  key={v.id}
                                                  className="flex justify-between items-center border-b border-gray-100 pb-1"
                                                >
                                                  <span>
                                                    • {v.cpu} / {v.ram} / {v.ssd}
                                                  </span>

                                                  <span className="text-red-500 font-medium">
                                                    {v.price.toLocaleString()} đ
                                                  </span>
                                                </div>
                                              ))}
                                            </div>

                                          </div>
                                        </div>

                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            )
                          })}
                        </tbody>
                      </table>

                    </div>
                    <div className="flex items-center justify-between mt-4">

                      {/* LEFT */}
                      <div className="flex items-center gap-2">
                        <span>Hiển thị:</span>

                        <select
                          value={limit}
                          onChange={(e) => {
                            setLimit(Number(e.target.value))
                            setPage(1)
                          }}
                          className="border rounded px-2 py-1"
                        >
                          <option value={5}>5</option>
                          <option value={15}>15</option>
                          <option value={20}>20</option>
                        </select>
                      </div>

                      {/* CENTER */}
                      <div className="flex items-center gap-2">

                        {/* về đầu */}
                        <button
                          onClick={() => setPage(1)}
                          disabled={page === 1}
                          className="px-2 py-1 border rounded disabled:opacity-50"
                        >
                          ⏮
                        </button>

                        {/* prev */}
                        <button
                          onClick={() => setPage(p => Math.max(p - 1, 1))}
                          disabled={page === 1}
                          className="px-2 py-1 border rounded disabled:opacity-50"
                        >
                          ◀
                        </button>

                        {/* input page */}
                        <input
                          type="number"
                          value={page}
                          onChange={(e) => {
                            let val = Number(e.target.value)
                            if (val < 1) val = 1
                            if (val > totalPages) val = totalPages || 1
                            setPage(val)
                          }}
                          className="w-12 text-center border rounded"
                        />

                        <span>/ {totalPages}</span>

                        {/* next */}
                        <button
                          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                          disabled={page === totalPages}
                          className="px-2 py-1 border rounded disabled:opacity-50"
                        >
                          ▶
                        </button>

                        {/* về cuối */}
                        <button
                          onClick={() => setPage(totalPages)}
                          disabled={page === totalPages}
                          className="px-2 py-1 border rounded disabled:opacity-50"
                        >
                          ⏭
                        </button>

                      </div>

                      {/* RIGHT */}
                      <div>
                        {start}-{end} trong {total} laptop
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </section>

      </div>

      <AddProductDialog open={open} setOpen={setOpen} />
    </>
  )
}
