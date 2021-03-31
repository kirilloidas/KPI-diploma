import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import NavBar from '../../components/navbar/Navbar';
import {fabric} from 'fabric';
import pipeImg from '../../img/1100087-plumber-tools/png/015-pipe.png'
import valveImg from '../../img/1100087-plumber-tools/png/030-valve.png'
import leakImg from '../../img/1100087-plumber-tools/png/014-leak-3.png'
import pipe4Img from '../../img/1100087-plumber-tools/png/024-pipe-8.png'
import pipe2Img from '../../img/1100087-plumber-tools/png/021-pipe-5.png'
import pump from '../../img/pump.svg';
import './MnemonicDiagram.scss';

const MnemonicDiagram = () => {
    const canv = useRef(null);
    useEffect(() => {
        const canvas = new fabric.Canvas(canv.current);
        // const rect = new fabric.Rect({
        //     left: 100,
        //     top: 100,
        //     fill: 'red',
        //     width: 100,
        //     height: 100
        // });
        // canvas.add(rect);
        fabric.Image.fromURL(leakImg, function(oImg) {
            oImg.scale(0.1);
            oImg.left = 60;
            oImg.top = 120;
            oImg.angle = 180;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 61.5
            oImg.left = 60
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 61.5
            oImg.left = 111;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(valveImg, function(oImg) {
            oImg.top = 52
            oImg.left = 160;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 61.5
            oImg.left = 211;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 61.5
            oImg.left = 262;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 61.5
            oImg.left = 313;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(leakImg, function(oImg) {
            oImg.scale(0.1);
            oImg.left = 400;
            oImg.top = 120;
            oImg.angle = 180;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 110
            oImg.left = 400;
            oImg.scale(0.1)
            oImg.angle = 90;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 161
            oImg.left = 400;
            oImg.scale(0.1)
            oImg.angle = 90;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 212
            oImg.left = 400;
            oImg.scale(0.1)
            oImg.angle = 90;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(leakImg, function(oImg) {
            oImg.scale(0.1);
            oImg.left = 348;
            oImg.top = 250;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 257.5
            oImg.left = 398;
            oImg.scale(0.1)
            canvas.add(oImg)
        })

        // Pumps
        fabric.Image.fromURL(leakImg, function(oImg) {
            oImg.top = 308.5
            oImg.left = 410;
            oImg.scale(0.1)
            oImg.angle = -90;
            canvas.add(oImg)
        })
        // top line pump
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 210
            oImg.left = 469;
            oImg.scale(0.1)
            canvas.add(oImg)
            oImg.angle = 90;
        })
        fabric.Image.fromURL(pipe2Img, function(oImg) {
            oImg.top = 180
            oImg.left = 434;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 164.5
            oImg.left = 479;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.loadSVGFromURL(pump, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            obj.top = 143
            obj.left = 500
            canvas.add(obj).renderAll();
        });
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 135
            oImg.left = 570;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipe2Img, function(oImg) {
            oImg.top = 150
            oImg.left = 670;
            oImg.scale(0.1)
            oImg.angle = 90;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 175
            oImg.left = 685;
            oImg.scale(0.1)
            oImg.angle = 90;
            canvas.add(oImg)
        })

        //bottom line pump
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 348
            oImg.left = 418;
            oImg.scale(0.1)
            canvas.add(oImg)
            oImg.angle = -90;
        })
        fabric.Image.fromURL(pipe2Img, function(oImg) {
            oImg.top = 390
            oImg.left = 433.5;
            oImg.scale(0.1)
            oImg.angle = -90;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 354
            oImg.left = 479;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.loadSVGFromURL(pump, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            obj.top = 334
            obj.left = 500
            canvas.add(obj).renderAll();
        });
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 326
            oImg.left = 570;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipe2Img, function(oImg) {
            oImg.top = 362
            oImg.left = 670;
            oImg.scale(0.1)
            oImg.angle = 180;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 311
            oImg.left = 634;
            oImg.scale(0.1)
            oImg.angle = -90;
            canvas.add(oImg)
        })
        fabric.Image.fromURL(leakImg, function(oImg) {
            oImg.top = 220.5
            oImg.left = 693;
            oImg.scale(0.1)
            oImg.angle = 90;
            canvas.add(oImg)
        })

        // line after pumps
        fabric.Image.fromURL(pipeImg, function(oImg) {
            oImg.top = 220.5
            oImg.left = 685;
            oImg.scale(0.1)
            canvas.add(oImg)
        })
    }, [])

    const getMnemonic = () => {
        // console.log(canv.current)
        // const canvas = new fabric.Canvas(canv.current);
        // const rect = new fabric.Rect({
        //     left: 100,
        //     top: 100,
        //     fill: 'red',
        //     width: 100,
        //     height: 100
        // });
        // console.log(rect)
        // canvas.add(rect);
    }
    return (
        <React.Fragment>
            <NavBar/>
            <canvas ref = {canv} width='1200' height='600' className='mnemonic'/>
            {/* <button onClick={() => getMnemonic()}>Click</button> */}
        </React.Fragment>
        
    )
}

export default connect(null, null)(MnemonicDiagram);