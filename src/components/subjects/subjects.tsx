import boys1 from "../../assets/images/boys1.png"
import boys2 from "../../assets/images/boys2.png"
import boys3 from "../../assets/images/boys3.png"
import { SubjectSignal } from "./subject-signal"
import './subjects.module.css';


export const Subjects = () => {
    var subjects: string[] = [boys1];
    function a() { }
    return (
        <div>
            <div className="subjectSignal">
                <SubjectSignal name="boys" src={boys1} /></div>
            <div className="subjectSignal">
                <SubjectSignal name="boys" src={boys2} /></div>
            <div className="subjectSignal">
                <SubjectSignal name="boys" src={boys3} /></div>
        </div>)
}