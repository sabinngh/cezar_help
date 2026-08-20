import ProblemRow from "./ProblemRow";

import "../styles/problemsTable.css";

function ProblemsTable({

    problems,

    onEdit,

    onDelete

}){

    if(problems.length===0){

        return(

            <div className="empty-table">

                No problems found.

            </div>

        );

    }

    return(

        <table className="problems-table">

            <thead>

                <tr>

                    <th>Title</th>

                    <th>Difficulty</th>

                    <th>Author</th>

                    <th>Created</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {problems.map(problem=>(

                    <ProblemRow

                        key={problem.id}

                        problem={problem}

                        onEdit={onEdit}

                        onDelete={onDelete}

                    />

                ))}

            </tbody>

        </table>

    );

}

export default ProblemsTable;