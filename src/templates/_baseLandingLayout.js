import React from "react";
import Layout from "../global/LandingLayout";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const BaseRender =
  (Page, options = {}) =>
  (props) => {
    const { data, pageContext } = props;
    let yml = null;
    try {
      yml = data[`all${cap(pageContext.type)}Yaml`].edges[0].node;
    } catch (err) {
      // console.error("Props: ", props);
      console.error(
        `There was a problem loading the data for type ${cap(
          pageContext.type
        )}`,
        data
      );
      console.error(err);
      return (
        <div className="alert alert-danger">
          There was a problem loading the data
        </div>
      );
    }
    let filteredPrograms;
    const utm_course = yml.meta_info?.utm_course;

    if (pageContext.type === "landing") {
      filteredPrograms =
        data.allChooseProgramYaml.edges[0].node.programs.filter((course_el) => {
          return (
            utm_course.filter((array_el) => {
              return course_el.bc_slug === array_el;
            }).length !== 0
          );
        });
    } else {
      filteredPrograms = [
        {
          label: null,
          value: null,
        },
      ];
    }

    return (
      <Layout
        landingNavbar={options.landingNavbar}
        landingFooter={options.landingFooter}
        seo={yml.meta_info}
        context={pageContext}
      >
        {/* <StickyBar /> */}
        <Page {...props} yml={yml} filteredPrograms={filteredPrograms} />
      </Layout>
    );
  };

export default BaseRender;
