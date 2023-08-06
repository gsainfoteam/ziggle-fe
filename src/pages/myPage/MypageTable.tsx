import PropTypes, { Validator } from "prop-types";
import Button from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import formatISODate from "src/utils/formatISODate";

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
      <div
        style={{
          width: "700px",
          border: "1px solid #ccc",
          borderCollapse: "separate",
          borderSpacing: "0",
          borderRadius: "10px",
        }}
      >
        <div>
          <div
            style={{
              height: "70px",
              backgroundColor: colorSet.primary,
              borderRadius: "10px 10px 0 0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ width: "75%", borderTopLeftRadius: "10px" }}>
              <Text
                size={"1.3rem"}
                color={colorSet.colorless}
                font={Font.Bold}
                style={{ paddingLeft: "20px" }}
              >
                {title}
              </Text>
            </div>
            <div
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
            </div>
          </div>

          {articles.length > 0 &&
            articles.map((articleObj, index) => {
              const isLastRow = index === articles.length - 1;
              const borderBottomRadius = isLastRow ? "10px" : "0px";
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: colorSet.colorless,
                    justifyContent: "space-between",
                    borderBottomLeftRadius: borderBottomRadius,
                    borderBottomRightRadius: borderBottomRadius,
                    border: "0.1px solid #e6e6e6",
                  }}
                >
                  <div
                    style={{
                      padding: "20px 0",
                      borderBottomLeftRadius: borderBottomRadius,
                      lineHeight: "1.5",
                    }}
                  >
                    <Text
                      size={"1.1rem"}
                      color={colorSet.text}
                      font={Font.Regular}
                      style={{ paddingLeft: "20px" }}
                    >
                      {articleObj.article.length > 35
                        ? articleObj.article.substring(0, 35) + "..."
                        : articleObj.article}
                    </Text>
                  </div>
                  <div
                    style={{
                      borderBottomRightRadius: borderBottomRadius,
                      padding: "0 10px",
                    }}
                  >
                    <Text
                      size={"1.1rem"}
                      color={colorSet.secondaryText}
                      font={Font.Regular}
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      {formatISODate(articleObj.date)}
                    </Text>
                  </div>
                </div>
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
                  padding: "30px",
                  backgroundColor: colorSet.colorless,
                  borderRadius: "0 0 10px 10px",
                }}
              >
                <LazyCat width={"35%"} height={"35%"} />
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
        </div>
      </div>
    </div>
  );
};

const MypageArticleShape = PropTypes.shape({
  article: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
});

MypageTable.propTypes = {
  title: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(MypageArticleShape).isRequired as Validator<
    MypageArticle[]
  >,
};

export default MypageTable;
