import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import NavBar from '../../components/navbar/Navbar';
import {fabric} from 'fabric';
import pipeImg from '../../img/1100087-plumber-tools/png/015-pipe.png'
import valveImg from '../../img/1100087-plumber-tools/png/030-valve.png'
import leakImg from '../../img/1100087-plumber-tools/png/014-leak-3.png'
import pipe4Img from '../../img/1100087-plumber-tools/png/024-pipe-8.png'
import pipe2Img from '../../img/1100087-plumber-tools/png/021-pipe-5.png'
import sensor from '../../img/1100087-plumber-tools/png/013-manometer.png'
import pump from '../../img/pump.svg';
import './MnemonicDiagram.scss';

const MnemonicDiagram = () => {
    const canv = useRef(null);
    
    
    useEffect(() => {
        const canvas = new fabric.Canvas(canv.current);

        const insertLeak = (left, top, angle) => {
            fabric.Image.fromURL(leakImg, function(oImg) {
                oImg.scale(0.1);
                oImg.left = left;
                oImg.top = top;
                oImg.angle = angle;
                canvas.add(oImg)
            })
        }

        const insertPipe = (left, top, angle) => {
            fabric.Image.fromURL(pipeImg, function(oImg) {
                oImg.top = top
                oImg.left = left
                oImg.scale(0.1)
                oImg.angle = angle;
                canvas.add(oImg)
            })
        }

        const insertValve = (left, top) => {
            fabric.Image.fromURL(valveImg, function(oImg) {
                oImg.top = top
                oImg.left = left;
                oImg.scale(0.1)
                canvas.add(oImg)
            })
        }

        const insertSensor = (left, top) => {
            fabric.Image.fromURL(sensor, function(oImg) {
                oImg.top = top
                oImg.left = left;
                oImg.scale(0.1)
                canvas.add(oImg)
            })
        }

        const insertAnglePipe = (left, top, angle) => {
            fabric.Image.fromURL(pipe2Img, function(oImg) {
                oImg.top = top
                oImg.left = left;
                oImg.scale(0.1)
                oImg.angle = angle;
                canvas.add(oImg)
            })
        }
        // first loop
        // ==================================================================================================
        insertLeak(60, 120, 180)
        insertPipe(60, 61.5)
        insertPipe(111, 61.5)
        insertValve(160, 52)
        insertPipe(211, 61.5)
        insertPipe(262, 61.5)
        insertPipe(313, 61.5)
        insertLeak(400, 120, 180)
        insertPipe(400, 61.5)
        insertPipe(451, 61.5)
        insertPipe(502, 61.5)
        insertPipe(553, 61.5)
        insertSensor(603, 44.5)
        insertPipe(650, 61.5)
        insertPipe(700, 61.5)
        insertPipe(751, 61.5)
        insertPipe(802, 61.5)
        insertPipe(853, 61.5)

        // vertical pipe
        insertPipe(400, 110, 90)
        insertPipe(400, 161, 90)
        insertPipe(400, 212, 90)
        insertLeak(348, 250)
        insertPipe(398, 257.5)
        
        // pipe after pump
        insertPipe(310, 257.5)
        insertPipe(270, 257.5)
        insertPipe(230, 257.5)
        insertPipe(190, 257.5)
        insertPipe(150, 257.5)

        // Pumps
        insertLeak(410, 308.5, -90)

        // top line pump
        insertPipe(469, 210, 90)
        insertAnglePipe(434, 180)
        insertPipe(479, 164.5)

        fabric.loadSVGFromURL(pump, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            obj.top = 143
            obj.left = 500
            canvas.add(obj).renderAll();
        });
        insertPipe(570, 135)
        insertAnglePipe(670, 150, 90)
        insertPipe(685, 175, 90)

        //bottom line pump
        insertPipe(418, 348, -90)
        insertAnglePipe(433.5, 390, -90)
        insertPipe(479, 354)
        fabric.loadSVGFromURL(pump, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            obj.top = 334
            obj.left = 500
            canvas.add(obj).renderAll();
        });
        insertPipe(570, 326)
        insertAnglePipe(670, 362, 180)
        insertPipe(634, 311, -90)
        insertLeak(693, 220.5, 90)

        // line before pumps
        insertPipe(685, 220.5)
        insertSensor(720, 203)
        insertSensor(770, 203)
        insertPipe(820, 220)



        //pipe from first to second loops
        // ==================================================================================================
        insertPipe(60, 110, 90)
        insertPipe(60, 150, 90)
        insertPipe(60, 190, 90)
        insertPipe(60, 230, 90)
        insertPipe(60, 270, 90)
        insertPipe(60, 310, 90)
        insertPipe(60, 350, 90)
        insertPipe(60, 390, 90)
        insertPipe(60, 430, 90)
        // insertLeak(9, 470)
        insertAnglePipe(24, 514, -90)


        // second loop
        // ==================================================================================================
        insertPipe(60, 478)
        insertPipe(111, 478)
        insertValve(160, 468.5)
        insertPipe(211, 478)
        insertPipe(262, 478)
        insertPipe(313, 478)
        insertLeak(400, 536.5, 180)
        insertPipe(400, 478)
        insertPipe(451, 478)
        insertPipe(502, 478)
        insertPipe(553, 478)
        insertSensor(603, 461)
        insertPipe(650, 478)
        insertPipe(700, 478)
        insertPipe(751, 478)
        insertPipe(802, 478)
        insertPipe(853, 478)

        // vertical pipe
        insertPipe(400, 526.5, 90)
        insertPipe(400, 577.5, 90)
        insertPipe(400, 628.5, 90)
        insertLeak(348, 666.5)
        insertPipe(398, 674)
        
        // pipe after pump
        insertPipe(310, 674)
        insertPipe(270, 674)
        insertPipe(230, 674)
        insertPipe(190, 674)
        insertPipe(150, 674)

        // Pumps
        insertLeak(410, 725, -90)

        // top line pump
        insertPipe(469, 626.5, 90)
        insertAnglePipe(434, 596.5)
        insertPipe(479, 581)

        fabric.loadSVGFromURL(pump, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            obj.top = 559.5
            obj.left = 500
            canvas.add(obj).renderAll();
        });
        insertPipe(570, 551.5)
        insertAnglePipe(670, 566.5, 90)
        insertPipe(685, 591.5, 90)

        //bottom line pump
        insertPipe(418, 764.5, -90)
        insertAnglePipe(433.5, 806.5, -90)
        insertPipe(479, 770.5)
        fabric.loadSVGFromURL(pump, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            obj.top = 750.5
            obj.left = 500
            canvas.add(obj).renderAll();
        });
        insertPipe(570, 742.5)
        insertAnglePipe(670, 778.5, 180)
        insertPipe(634, 727.5, -90)
        insertLeak(693, 637, 90)

        // line before pumps
        insertPipe(685, 637)
        insertSensor(720, 619.5)
        insertSensor(770, 619.5)
        insertPipe(820, 636.5)
    }, [])

    return (
        <React.Fragment>
            <NavBar/>
            <canvas ref = {canv} width='1200' height='900' className='mnemonic'/>
        </React.Fragment>
        
    )
}

export default connect(null, null)(MnemonicDiagram);