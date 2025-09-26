import React from "react";

const FAQs = ({ 
  title, 
  data = [
    {
      question: "Is there a free trial available?",
      answer: <p>Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.</p>
    }
  ]
}) => {
  return (
    <div className="tab-content mt-32" id="v-pills-tabContent">
      {title && <h6 className="mb-16">{title}</h6>}

      <div
        className="tab-pane fade show active"
        id="v-pills-about-us"
        role="tabpanel"
        aria-labelledby="v-pills-about-us-tab"
        tabIndex={0}
      >
        <div className="accordion" id="accordionExample">
          {data.map((faqItem, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button text-primary-light text-xl ${index !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {faqItem.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body mt-12">
                  {faqItem.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
