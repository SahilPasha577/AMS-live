import React from 'react'
import videoSrc from "../Videos/pro.mp4"
import "./vid.css"
import img1 from '../Videos/about.jpg'

export const Home = () => {
    return (
        <>

            <div className='vide'>
                <div className='py-4'></div>
                <div className='content-vid  text-center py-4 text-light'>
                    <h1 className='py-4 pad' style={{ padding: `150px` }}><b>AMS</b></h1>
                </div>


                <div className='text-center butn-vid'>
                    <button className=' butn-vid1'>   <b>Explore More</b></button>
                </div>



                <video autoPlay loop muted playsInline class="vid">
                    <source src={videoSrc} type="video/mp4" />



                </video>


            </div>

            <div className="container text-center my-4">
                <div className="row my-4">
                    <div className="col h-100 my-4">
                        <img src={img1} alt="pic" />
                    </div>
                    <div className="col my-4 text-md-start">
                        <h2 className='my-4'>Attendance Management System</h2>
                        An attendance management system serves as a central hub for recording, managing, and analyzing attendance data. Within this system, CRUD (Create, Read, Update, Delete) operations are fundamental functionalities that enable users to interact with attendance records efficiently. Users can create new attendance entries for individuals or groups, inputting details such as date, time, and participant information. The system allows for the retrieval of attendance records, enabling users to view data for specific dates, individuals, or groups. Updates to attendance records can be made to correct errors, modify details, or add additional information as needed. Additionally, users may have the capability to delete outdated or erroneous attendance entries to maintain data accuracy and integrity. Through these CRUD operations, an attendance management system empowers users with the tools to effectively track, maintain, and manipulate attendance data in alignment with organizational or institutional requirements.
                    </div>
                </div>

            </div>
        </>
    )
}
