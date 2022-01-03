import boys from "../../assets/images/boys.png"
import girls from "../../assets/images/girls.png"
import babyboys from "../../assets/images/babyboys.png"
import babygirls from "../../assets/images/babygirls.png"
import newborn from "../../assets/images/newborn.png"
import bottom from "../../assets/images/bottom.png"
import { SubjectSignal } from "./subject-signal"
import './subjects.module.css';


export const Subjects = () => {
    return (
        <div>
            <div className="d-flex">
                <div className="subjectSignal p2">
                    <SubjectSignal name="boys" src={boys} /></div>
                <div className="subjectSignal p2">
                    <SubjectSignal name="girls" src={girls} /></div>
                <div className="subjectSignal">
                    <SubjectSignal name="babyGirls" src={babygirls} /></div>
                <div className="subjectSignal"></div>
            </div>

            <div className="d-flex">
                <div className="subjectSignal">
                    <SubjectSignal name="babyBoys" src={babyboys} /></div>
                <div className="subjectSignal">
                    <SubjectSignal name="newborn" src={newborn} /></div>
                <div className="subjectSignal">
                </div>

                {/* <div className="d-flex"> */}

                    {/* <SubjectSignal name="new born" src={boys3} /></div> */}
            </div>
            <img className="bottom" src={bottom} alt=''/>
        </div>
    )
}