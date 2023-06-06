import React, { useEffect, useState }from "react";
import bg from "../images/bg_all.png";
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import AppAdviser from "../components/AdviserView";

export default function ManageApps() {
    const adviserEmail = localStorage.getItem("email")
    const [students, setStudents] = useState([])
    const [usertype, setUserType] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:3001/get-usertype-by-email?email=${adviserEmail}`)
        .then(response => response.json())
        .then(data => {
            if (data.usertype == 2) {
                fetch(`http://localhost:3001/get-student-by-adviser-email?email=${adviserEmail}`)
                .then((response) => response.json())
                .then((body) => {
                    setStudents(body);
                });
            } else if (data.usertype == 3) {
                fetch(`http://localhost:3001/get-students-if-co`)
                .then((response) => response.json())
                .then((body) => {
                    setStudents(body);
                });
            }
            setUserType(data.usertype)
        })
    }, []);

    function changeHandler(id) {
        setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
        },
        image: {
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'start',
        }})

    return (
        <>
        <View style={styles.container}>
            <ImageBackground source={bg} style={styles.image}>
                <div class="w-[100%] flex flex-col">
                    <div class="flex justify-center container container mx-auto">
                        < h1 class="font-extrabold flex self-center justify-center text-100-charcoal text-4xl p-5">
                            Clearance Requests
                        </h1>
                    </div>
                    <div class="flex flex-wrap flex-row items-center p-5 place-content-center">
                        {
                            students.map((student, i) => 
                                <AppAdviser class="" adviserEmail={adviserEmail} student={student} usertype={usertype} onChange={changeHandler}/>
                            )
                        }
                    </div>           
                </div>                 
            </ImageBackground>
        </View>
           
        </>

    );
}
  