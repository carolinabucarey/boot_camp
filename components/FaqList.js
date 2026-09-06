export default function FaqList({ faqs }) {
  return (
    <div id="faq-list">
      {faqs.map((faq) => (
        <details className="faq" key={faq.question}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
