export function TechnologyStrip({
  technologies,
  labels,
}: {
  technologies: string[];
  labels: { title: string };
}) {
  return (
    <section
      className={
        "stack-strip relative [border-block:1px_solid_var(--border)] overflow-hidden [&_span]:[font-size:16px] [&_span]:[font-weight:550] [&_span]:text-muted-foreground [&_span]:whitespace-nowrap [&_.strip-star]:text-primary [&_.strip-star]:[font-size:19px] [&_.strip-star]:font-normal max-[800.01px]:[&_span]:[font-size:13px] print:hidden!"
      }
      aria-label={labels.title}
    >
      <div
        className={
          "stack-strip-viewport overflow-hidden [mask-image:linear-gradient(_to_right,_transparent,_black_48px,_black_calc(100%_-_48px),_transparent_)]"
        }
        aria-hidden="true"
      >
        <div
          className={
            "stack-track flex w-[max-content] [animation:stack-scroll_40s_linear_infinite] [will-change:transform] [html[data-motion='off']_&]:w-full [html[data-motion='off']_&]:[transform:none] [html[data-motion='off']_&]:[will-change:auto]"
          }
        >
          {[0, 1].map((copyIndex) => (
            <div
              className={
                "stack-group flex shrink-0 items-center [justify-content:space-around] min-w-[100vw] gap-10 p-[23px_20px] max-[800.01px]:gap-6 max-[800.01px]:py-5 [html[data-motion='off']_&]:flex-wrap [html[data-motion='off']_&]:min-w-[0] [html[data-motion='off']_&]:w-full [html[data-motion='off']_&]:justify-center [html[data-motion='off']_&]:gap-[16px_24px] [html[data-motion='off']_&_+_.stack-group]:hidden"
              }
              key={copyIndex}
            >
              {technologies.map((technology) => (
                <span
                  className={
                    "stack-item inline-flex items-center gap-10 max-[800.01px]:gap-6 [html[data-motion='off']_&]:gap-6"
                  }
                  key={technology}
                >
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
