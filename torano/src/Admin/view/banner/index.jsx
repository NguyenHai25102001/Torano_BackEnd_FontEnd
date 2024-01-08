import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Banner() {

    return (
        <div className='layout-banner'>
            <h2>Danh sách Banner</h2>

            <div className='row-cols-1'>
                <div className="my-2">
                    <button type='button' className='btn btn-primary'>
                        Thêm Banner
                    </button>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Banner</th>
                        <th scope="col"></th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>
                            <div className="">

                            </div>
                        </td>
                        <td className='text-center'>
                            {/*<button type={'button'} className='me-2'>*/}
                            {/*    <Link to={'/admin/product/'}>*/}
                            {/*        <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffd43b",}} size={'2xl'} />*/}
                            {/*    </Link>*/}
                            {/*</button>*/}
                            <button type={'button'}

                            >

                                <FontAwesomeIcon icon={faTrash} size="2xl" style={{color: "#f00000",}} />
                            </button>
                        </td>

                    </tr>

                    </tbody>
                </table>

            </div>

        </div>
    )

}

export default Banner;