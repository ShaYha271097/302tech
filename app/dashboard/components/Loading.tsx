


export default function Loading(){
    return
    (
        <button
            onClick={handleSave}
            disabled={loadingSave}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm disabled:opacity-60"
        >
            <span className={loadingSave ? "opacity-0" : "opacity-100"}>
                Lưu thay đổi
            </span>

            {loadingSave && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin text-sm" />
                </span>
            )}
        </button>
    )
}

