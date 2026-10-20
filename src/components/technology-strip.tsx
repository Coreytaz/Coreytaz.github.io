export function TechnologyStrip({
  technologies,
  labels,
}: {
  technologies: string[];
  labels: { title: string };
}) {
  return (
    <section className="stack-strip" aria-label={labels.title}>
      <div className="stack-strip-viewport" aria-hidden="true">
        <div className="stack-track">
          {[0, 1].map((copyIndex) => (
            <div className="stack-group" key={copyIndex}>
              {technologies.map((technology) => (
                <span className="stack-item" key={technology}>
                  <span>{technology}</span>
                  <span className="strip-star">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
