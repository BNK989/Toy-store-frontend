import React from 'react'
import img from '../assets/img/react2.svg'



export function HomePage() {
    return <section>
        <h1>Home page for <strong>Poki</strong> toys!</h1>
        <div>
            <img src={img} />
        </div>
    </section>
}