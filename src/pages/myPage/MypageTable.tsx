import Text from "src/atoms/text/Text";
import articles from "src/mock/dummy-mypage-articles";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

interface MypageTableProps {
  title: string;
  article?: string;
  date?: string;
}

const MypageTable: React.FC<MypageTableProps> = ({ title }) => {
  return (
    <div
      style={{ borderRadius: "10px", boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)" }}
    >
      <table
        style={{
          width: "700px",
          borderCollapse: "separate",
          borderSpacing: "0",
          borderRadius: "10px",
        }}
      >
        <tbody>
          <tr
            style={{
              height: "70px",
              backgroundColor: colorSet.primary,
              borderRadius: "10px 10px 0 0",
            }}
          >
            <td style={{ width: "75%", borderTopLeftRadius: "10px" }}>
              <Text
                size={"1.3rem"}
                color={colorSet.colorless}
                font={Font.Medium}
                style={{ paddingLeft: "20px" }}
              >
                {title}
              </Text>
            </td>
            <td style={{ width: "25%", borderTopRightRadius: "10px" }}></td>
          </tr>

          {articles.map((articleObj, index) => {
            const isLastRow = index === articles.length - 1;
            const borderBottomRadius = isLastRow ? "10px" : "0px";
            return (
              <tr key={index} style={{ height: "70px" }}>
                <td
                  style={{
                    borderBottomLeftRadius: borderBottomRadius,
                    borderLeft: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    width: "75%",
                  }}
                >
                  <Text
                    size={"1.2rem"}
                    color={colorSet.text}
                    font={Font.Regular}
                    style={{ paddingLeft: "20px" }}
                  >
                    {articleObj.article}
                  </Text>
                </td>
                <td
                  style={{
                    borderBottomRightRadius: borderBottomRadius,
                    borderRight: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    width: "25%",
                  }}
                >
                  <Text
                    size={"1.2rem"}
                    color={colorSet.text}
                    font={Font.Regular}
                    style={{ padding: "10px", textAlign: "center" }}
                  >
                    {articleObj.date}
                  </Text>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MypageTable;
