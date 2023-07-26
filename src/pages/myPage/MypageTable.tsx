import Button from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

import LazyCat from "./assets/LazyCat";
interface MypageTableProps {
  title: string;
  articles: MypageArticle[];
}

export interface MypageArticle {
  article: string;
  date: string;
}

const MypageTable: React.FC<MypageTableProps> = ({ title, articles }) => {
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
                font={Font.Bold}
                style={{ paddingLeft: "20px" }}
              >
                {title}
              </Text>
            </td>
            <td
              style={{
                width: "25%",
                borderTopRightRadius: "10px",
              }}
            >
              <Button
                style={{
                  width: "100%",
                  paddingRight: "20px",
                }}
              >
                <Text
                  size={"1rem"}
                  color={colorSet.colorless}
                  font={Font.Regular}
                  style={{
                    textDecoration: "underline",
                    textAlign: "right",
                    padding: "10px",
                  }}
                >
                  전체보기
                </Text>
              </Button>
            </td>
          </tr>

          {articles.length > 0 &&
            articles.map((articleObj, index) => {
              const isLastRow = index === articles.length - 1;
              const borderBottomRadius = isLastRow ? "10px" : "0px";
              return (
                <tr key={index}>
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottomLeftRadius: borderBottomRadius,
                      borderLeft: "1px solid #ccc",
                      borderBottom: "1px solid #ccc",
                      lineHeight: "1.5",
                    }}
                  >
                    <Text
                      size={"1.1rem"}
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
                      borderBottom: "1px solid #ccc",
                      padding: "0 10px",
                    }}
                  >
                    <Text
                      size={"1.1rem"}
                      color={colorSet.secondaryText}
                      font={Font.Regular}
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      {articleObj.date}
                    </Text>
                  </td>
                </tr>
              );
            })}
          {articles.length === 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <LazyCat width={"50%"} height={"50%"} />
                <Text
                  size={"1.3rem"}
                  color={colorSet.secondaryText}
                  font={Font.Medium}
                  style={{ padding: "20px" }}
                >
                  아직 저장된 글이 없습니다. =ㅅ=
                </Text>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MypageTable;
