import React, { useState, useEffect } from 'react'
import classes from './AdminPage.module.css'

const AdminPage = () => {
    const [masterData, setmasterData] = useState([])
    return (
        <div>
            <div className={classes['container']}>
                <div class="card">
                    <img class="card-img-top" src="..." alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
