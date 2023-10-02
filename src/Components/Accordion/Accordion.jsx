export const Accordion = ({idAccordion, children, accordionButtonText = 'Accordion', accordionClasses = '', accordionItemClasses = '', accordionHeaderClasses = '', accordionButtonClasses = '', dataBsTarget = ''})=>{
    return (
        <div id={idAccordion} className={`${accordionClasses} accordion`}>
            <div className={`${accordionItemClasses} accordion-item border-0`}>
                <h2 className={`accordion-header ${accordionHeaderClasses}`}>
                    <button style={{textAlign:"left"}} className={`btn w-100 ${accordionButtonClasses}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${dataBsTarget}`} aria-expanded="true" aria-controls={dataBsTarget}>
                        {accordionButtonText}
                    </button>
                </h2>
                <div id={`${dataBsTarget}`} className="accordion-collapse collapse" data-bs-parent={`${idAccordion}`}>
                    {children}
                </div>
                </div>
        </div>
    )
}
