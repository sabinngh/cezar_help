import "../styles/confirmModal.css";

function ConfirmModal({
    title,
    message,
    onConfirm,
    onCancel
}) {

    return (

        <div className="confirm-overlay">

            <div className="confirm-modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;