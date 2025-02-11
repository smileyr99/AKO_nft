import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import './Create.css';

class Create extends Component {

    async ipfsDynamicMint() {
        console.log('starting upload image to ipfs')

        // 이미지 파일을 담을 폼 데이터 생성
        const formData = new FormData()

        // 이미지 파일 담기
        formData.append('file', this.state.imgFile)

        /*
        //formData value 확인
        for (var value of formData.values()) {
            console.log(value);
        }
        */

        //피나타 pinFileToIPFS API 시작
        // call the keys from .env
        const API_KEY = 'a4d93241a5cf57f2b2cc'
        const API_SECRET = '41e21a929cd3c1c4cc76e2cbe88472f5c5c4d0c53c0f7a75bd69ece528e0bf48'

        // the endpoint needed to upload the file
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

        const response = await axios.post(
            url,
            formData,
            {
                maxContentLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'pinata_api_key': API_KEY,
                    'pinata_secret_api_key': API_SECRET
                }
            }
        )

        //결과 출력
        console.log(response)

        // get the hash
        this.setState({ ipfsHash: response.data.IpfsHash })
        console.log(this.state.ipfsHash)



        console.log('starting starting upload json to ipfs')

        //피나타 pinJSONTOIPFS 시작
        // the endpoint needed to upload the file
        const url2 = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

        const response2 = await axios.post(
            url2, {
            name: this.state.imgName,
            description: this.state.imgDescription,
            image: 'https://ako.mypinata.cloud/ipfs/' + this.state.ipfsHash
        },
            {
                maxContentLength: "Infinity",
                headers: {
                    'pinata_api_key': API_KEY,
                    'pinata_secret_api_key': API_SECRET
                }
            }
        )

        console.log(response2)

        // get the hash
        this.setState({ ipfsHash: response2.data.IpfsHash })
        console.log(this.state.ipfsHash)
        const tokenURI = 'https://ako.mypinata.cloud/ipfs/' + this.state.ipfsHash

        //Mint
        this.props.mint(tokenURI);

    }

    
    // 미리보기를 위한 이미지 처리 과정
    encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                this.setState({ imgSrc: reader.result })
                resolve();
            };
        }
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            imgFile: null,
            ipfsHash: '',
            imgName: '',
            imgDescription: '',
            imgSrc: ''
        }
    }

    render() {
        return (
            <div style={{height:"81vh"}}>
                <div className="createContainer">
                    <div style={{display:"flex"}}>
                        <div className="createLeft">
                            <h2 style={{position:"absolute",left:"20%",textDecoration:"underline",textDecorationColor:"midnightblue"}}>Create your NFT.</h2>
                            <input style={{position:"absolute",left:"45%",top:"22%"}} type="file" name="imgFile" onChange={(event) => {
                                event.preventDefault()
                                const fobj = event.target.files[0]
                                this.setState({ imgFile: fobj })
                                this.encodeFileToBase64(event.target.files[0]);
                            }} />
                            <div className="createPreview"> {this.state.imgSrc && <img src={this.state.imgSrc} alt="preview-img" width='200px' height='200px' />} </div>
                        </div>

                        <div className="createRight">
                            <div>
                                <h3>Name</h3>
                                <input type="text" name="imgName" placeholder="👀" onChange={(event) => {
                                    event.preventDefault()
                                    this.setState({ imgName: event.target.value })
                                }} />
                            </div>
                            <br/>
                            <div>
                                <h3>Description</h3>
                                <textarea className="createTextbox" name="imgDescription" placeholder="Describe your NFT." onChange={(event) => {
                                    event.preventDefault()
                                    this.setState({ imgDescription: event.target.value })
                                }} ></textarea>
                            </div>

                            <br />
                        </div>
                    </div>
                    <button className="createButton" onClick={() => {
                                this.ipfsDynamicMint()
                    }}>Mint</button>

                </div>
            </div>
        );
    }
}

export default Create;