//import defaults from "src/styles/defaults";
import colorSet from "../../styles/colorSet";
import Navbar from "src/templates/navbar/Navbar";
import defaults from "src/styles/defaults";
import SearchVar from "../../molecules/search/Search";
import Footer from "src/templates/footer/Footer";
import Button,{ButtonVariant} from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import {ReactComponent as SearchPrimary} from "../../../src/atoms/icon/assets/SearchPrimary.svg";
const SearchPage = () => {
    const handleSubmit = () =>{

    };
    return (
    <>
    <Navbar background-color={colorSet.primary}></Navbar>
    <Area>
    <Content>
    <p style = {{height:"150px", margin : '0 auto'}}></p>
    <p style = {{ paddingLeft : defaults.pageSideGap, paddingRight : defaults.pageSideGap}}>
            <p style={{ width: '850px', margin: '0 auto' }}>   
                <SearchVar onSubmit={handleSubmit} placeholder={"검색어를 입력하세요"}/>
                <p style = {{height : "30px", margin : '0 auto'}}></p>    
                <p style={{ height: "40px", margin:'0 auto'}}>
                    <Button style={{padding:'10px'}} width = {"91px"} variant={ButtonVariant.outlined} >
                        <Text size="20px" color={colorSet.primary}>
                            🎯모집
                        </Text>
                    </Button>
                    <Button style={{padding:'10px', marginLeft:'15px'}} width = {"91px"} variant={ButtonVariant.outlined} >
                        <Text size="20px" color={colorSet.primary}>
                            🎈행사
                        </Text>
                    </Button>
                    <Button style={{padding:'10px', marginLeft:'15px'}} width = {"91px"} variant={ButtonVariant.outlined} >
                        <Text size="20px" color={colorSet.primary}>
                            🔔일반
                        </Text>
                    </Button>
                    <Button style={{padding:'10px', marginLeft:'15px'}} width = {"91px"} variant={ButtonVariant.outlined} >
                        <Text size="20px" color={colorSet.primary}>
                            📰학사
                        </Text>
                    </Button>
                </p>
            <p style = {{ height: '265px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin:'50px' }}>
            <SearchPrimary color={colorSet.secondaryText} style={{width:'200px', height:'200px'}}></SearchPrimary>
            <Text size="30px" color={colorSet.secondaryText} style={{paddingTop:'20px'}}>
                            검색어를 입력해주세요
            </Text>
            </p>
            </p>
    </p>
    <p style = {{height:"300px", margin : '0 auto'}}></p>
    </Content>
    </Area>
    <Footer></Footer>
</>
    );
};

export default SearchPage;
