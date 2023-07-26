import { Meta, StoryFn } from "@storybook/react";
import { dummyAcademicNotices } from "src/mock/dummy-academic-notices";

// import colorSet from "src/styles/colorSet";
import AcademicTable, { AcademicTableType } from "./AcademicTable";

export default {
  title: "templates/academicTable/AcademicTable",
  component: AcademicTable,
} as Meta<typeof AcademicTable>;

const Template: StoryFn<typeof AcademicTable> = (args) => (
  <AcademicTable {...args} />
);

export const DefaultRow = Template.bind({});
DefaultRow.args = dummyAcademicNotices[0];

export const TitleRow = Template.bind({});
TitleRow.args = {
  type: AcademicTableType.Title,
};
