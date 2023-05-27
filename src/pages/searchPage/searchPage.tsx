//import defaults from "src/styles/defaults";
import colorSet from "../../styles/colorSet";
import Navbar from "src/templates/navbar/Navbar";
import defaults from "src/styles/defaults";
import SearchVar from "../../molecules/search/Search";
import Footer from "src/templates/footer/Footer";
import Button from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
//import {ReactComponent as SearchPrimary} from "../../../src/atoms/icon/assets/SearchPrimary.svg";
//import {ReactComponent as XPrimary} from "../../../src/atoms/icon/assets/xPrimary.svg";
import {useState} from 'react';
import SearchResult from "src/templates/searchResult/SearchResult";
import SearchResultText from "src/templates/searchResultText/SearchResultText";
import NoticeTypeRadio from "src/molecules/noticeTypeRadio/NoticeTypeRadio";
import { NoticeType } from "src/types/types";
import {ReactComponent as SearchNoResult} from "../../../src/atoms/icon/assets/searchNoResult.svg";
import Font from "src/styles/font";
import {Search,XXPrimary} from "src/assets/Icons";


const SearchPage = () => {
    const handleSubmit = () =>{
        
    };
    const [showResults, setShowResults] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [defaultResults, setDefaultResults] = useState(true);
    const result = () =>{
        setShowResults(true);
        setDefaultResults(false);
        setNoResults(false);
    }

    const noResult = () =>{
    setNoResults(true);
    setDefaultResults(false);
    setShowResults(false);
    }


    return (
    <>
    
    <Area>
    <Navbar background-color={colorSet.primary}></Navbar>
    <Content>
    <Button style = {{background:colorSet.placeholder}} onClick= {result}>result</Button> 
    <Button onClick= {noResult} style = {{margin:"10px"}}>noResult</Button>
    <div style = {{height:"150px", margin : '0 auto',display : 'flex', justifyContent: 'flex-end'}}>

    <Button>
    <XXPrimary size="25px" color={colorSet.secondaryText}/>
    </Button>
    
    </div>
    <p style = {{ paddingLeft : defaults.pageSideGap, paddingRight : defaults.pageSideGap}}>
            <p style={{ width: '700px', margin: '0 auto' }}>   
                <SearchVar onSubmit={handleSubmit} placeholder={"공지 제목이나 태그로 검색"}/>
                <p style = {{height : "30px", margin : '0 auto'}}></p>    
                <p style={{ height: "40px", margin:'0 auto'}}>
                <NoticeTypeRadio selected={NoticeType.RECRUIT} onChange={handleSubmit} />
                </p>
                <p style = {{ height: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin:'50px' }}>

        {defaultResults && (
                
            
            <p>
                <Search size="250px" color={colorSet.secondaryText}  ></Search>
            <p style = {{height : "10px", margin : '0 auto'}}></p> 
            <Text size="25px" color={colorSet.secondaryText} font={Font.Medium} style={{paddingTop:'20px'}}>
                            검색어를 입력해주세요
            </Text>
            </p>
        )} 


        {showResults && (

            <p>
            
            <SearchResult
              deadline="2023.02.28"
              title="인포팀 신규 부원 모집"
              author="이정우"
              tags = {["인포팀", "신규부원", "모집"]}
              date = "2023.02.13"
              viewCount ={ 123}
              thumbnailUrl = "https://picsum.photos/2000/3000"
              searchQuery = "이"
            
            ></SearchResult>

            <SearchResultText
            deadline="2023.02.28"
            title="인포팀 신규 부원 모집"
            author="이정우"
            tags={["모집", "WING", "많관부"]}
            date="2023.02.13"
            viewCount={123}
            content="안녕하세요, 하우스연합회입니다. 2023년 3월 1일, 하우스연합회에서 중고장터를 진행합니다❗퇴사자, 잔류자, 신입생 상관없이 판매 물품/무료나눔하고자하는 물품이 있으시다면 자유롭게 등록해주시기 바랍니다! 자세한 일정은 다음..."
            searchQuery="이"
            thumbnailUrl=""
            />
</p>
          )}


          {noResults && (
        <p>
            <p>
            <p style = {{height : "10px", margin : '0 auto'}}></p> 
            <SearchNoResult></SearchNoResult>
            <Text size="25px" color={colorSet.secondaryText} style={{paddingTop:'20px'}}>
                검색 결과가 없습니다.
            </Text>
            </p>

        </p>    
        
        )}
        </p>
        </p>
    </p>
    <p style = {{height:"300px", margin : '0 auto'}}></p>
    </Content>
    <Footer></Footer>
    </Area>
    
</>
    );
};

export default SearchPage;
