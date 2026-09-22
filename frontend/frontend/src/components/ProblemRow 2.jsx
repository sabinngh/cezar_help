function ProblemRow({

    problem,

    onEdit,

    onDelete

}){

    return(

        <tr>

            <td>

                {problem.title}

            </td>

            <td>

                <span
                    className={`difficulty ${problem.difficulty.toLowerCase()}`}
                >

                    {problem.difficulty}

                </span>

            </td>

            <td>

                {problem.author?.username}

            </td>

            <td>

                {new Date(problem.created_at).toLocaleDateString()}

            </td>

            <td>

                <button

                    className="edit-btn"

                    onClick={()=>onEdit(problem)}

                >

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={()=>onDelete(problem)}

                >

                    Delete

                </button>

            </td>

        </tr>

    );

}

export default ProblemRow;