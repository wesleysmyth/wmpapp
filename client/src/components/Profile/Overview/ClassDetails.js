import React from 'react';
import { getCountryName } from '../../../utils/helpers';

const ClassDetails = ({ classData, teacher, title }) => {
    let school;

    if (!classData || !classData.id || !teacher) {
        return null
    }

    if (classData && classData.school) {
        school = classData.school || {};
    }

    return (
        <div>
            <h3 style={{marginBottom: '18px'}}>{title} {classData && classData.name || null}</h3>
            <div className='div-display-inline-block'>
                <div className='inner-box-inline-block'>
                    <div>
                        <label>Teacher</label>
                        <label>Email</label>
                        <label>Phone</label>
                        {classData && classData.size ? <label>Class size</label> : null}
                    </div>
                    <div style={{marginLeft: "12px"}}>
                        <span>{teacher.firstName || null} {teacher.lastName || null}</span>
                        <span>{teacher.email || null}</span>
                        <span>{teacher.phone || "Not specified"}</span>
                        <span>{`${classData && classData.size} students` || null }</span>
                    </div>
                </div>
            </div>
            { classData && classData.school && classData.school.schoolName
                ? <div>
                    <br />
                    <label><b>School Address</b></label>
                    <div>
                        <span>{school.schoolName || null}</span><br />
                        <span>{school.address1 || null} {school.address2 || null}</span><br />
                        <span>{school.zip || null} {school.city || null}</span><br />
                        <span>{getCountryName(school.country) || null}</span>
                    </div>
                </div>
            : null }
        </div>
    );
};

export default ClassDetails;
