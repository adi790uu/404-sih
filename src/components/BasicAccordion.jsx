import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const accordionData = [
    {
        question: 'What is this application used for?',
        answer: 'This application is used to provide information and assistance related to disaster preparedness and response.'
    },
    {
        question: 'What are the working hours of assistance?',
        answer: 'All services and assistance are available 24/7.'
    },
    {
        question: 'Can the platform be used in other languages as well?',
        answer: 'At the moment, all content on the platform is available only in English.'
    },
    {
        question: 'Is it absolutely necessary for me to share my location?',
        answer: 'Yes, location sharing is essential for us to connect you with rescue agencies'
    },
    {
        question: 'How to report a calamity on the platform?',
        answer: 'Follow the steps:'
    },
    {
        question: 'What medications or medical supplies should I have on hand in case of an emergency?',
        answer: "In case of an emergency, it's advisable to have the following medications and medical supplies on hand:1. First Aid Kit: Including bandages, antiseptics, and scissors.2. Prescription Medications: Maintain a supply of your prescribed medications.3. Pain Relievers: Over-the-counter pain relievers like aspirin or ibuprofen.4. Allergy Medications: Antihistamines for allergic reactions."
    },
    {
        question: 'What are basic first aid techniques for common injuries?',
        answer: 'Basic first aid techniques for common injuries include cleaning and covering wounds,applying pressure to stop bleeding, elevating injured limbs, splinting fractures, and performing CPR if needed. Additionally, knowing how to treat burns, manage choking, and provide comfort and support to the injured person are essential skills in first aid.'
    },
    {
        question: 'How can I administer CPR?',
        answer: 'CPR (Cardiopulmonary Resuscitation): 1. Call 108 and begin chest compressions.2. Give two rescue breaths after 30 compressions.3. Repeat until help arrives or breathing resumes.'
    },
    {
        question: 'What to do in case someone is choking?',
        answer: 'Heimlich Maneuver (for choking):1. Stand behind, place a fist above the navel.2. Grasp with the other hand, give upward thrusts.3. Repeat until the object is expelled or unconsciousness occurs; seek medical help.'
    },
    {
        question: 'How do I recognize and respond to heat-related illnesses?',
        answer: 'Recognizing and responding to heat-related illnesses is crucial:1. Heat Exhaustion: Symptoms include heavy sweating, weakness, nausea, and dizziness. Move to a cooler place, hydrate, and rest.2. Heat Stroke: Signs include confusion, high body temperature, and loss of consciousness. Call 108, cool the person with water, and provide shade.3. Dehydration: Look for dry mouth, dark urine, and thirst. Drink fluids and rest in a cool area.4. Heat Cramps: Muscle cramps and pain may occur. Rest, hydrate, and gently stretch affected muscles.5. Seek Medical Help: If symptoms worsen or dont improve, especially in cases of heat stroke, seek immediate medical assistance'
    },
    {
        question: 'How do I use a fire extinguisher?',
        answer: 'Using a fire extinguisher: 1. Pull: Pull the pin from the extinguishers handle to break the tamper seal. Aim: Aim the nozzle at the base of the fire, not the flames themselves.3. Squeeze: Squeeze the handle to release the extinguishing agent, typically a dry chemical or foam.4. Sweep: Sweep the nozzle from side to side, covering the base of the fire with the extinguishing agent.5. Back Away: After the fire is under control, back away slowly to a safe distance, keeping an eye on the area to ensure the fire does not reignite.'
    },
];

export default function BasicAccordion() {

  return (
    <div>
        {accordionData.map((data, index)=>{
            return(
                <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{data.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {data.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
            )
        })}
      

    </div>
  );
}
