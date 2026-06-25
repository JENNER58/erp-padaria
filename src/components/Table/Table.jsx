import styles from "./Table.module.css";

export default function Table({

    columns = [],

    data = [],

    emptyMessage = "Nenhum registro encontrado."

}){

    return(

        <div className={styles.container}>

            <table className={styles.table}>

                <thead>

                    <tr>

                        {

                            columns.map((column)=>(

                                <th key={column.key}>

                                    {column.title}

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        data.length === 0 ? (

                            <tr>

                                <td

                                    colSpan={columns.length}

                                    className={styles.empty}

                                >

                                    {emptyMessage}

                                </td>

                            </tr>

                        ) : (

                            data.map((row,index)=>(

                                <tr key={index}>

                                    {

                                        columns.map((column)=>(

                                            <td key={column.key}>

                                                {

                                                    column.render

                                                        ? column.render(row)

                                                        : row[column.key]

                                                }

                                            </td>

                                        ))

                                    }

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}