import { LightningElement, api, track, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartJs';
import getChartSentence from '@salesforce/apex/createSentence.getChartSentence';

export default class LibsChartjs extends LightningElement {
    
    //receive parentId from parent LWC
    @api sentenceId;

    @track sentence;
    error;
    @track chart;
    chartjsInitialized = false;

    //configuration variable
    config = {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        'rgb(192, 11, 92)', 
                        'rgb(191, 97, 215)',
                        'rgb(69, 15, 36)',
                        'rgb(197, 86, 186)',
                        'rgb(56, 7, 41)',
                        'rgb(124, 68, 225)',
                        'rgb(26, 243, 223)',
                        'rgb(159, 198, 55)',
                        'rgb(167, 69, 94)',
                        'rgb(173, 151, 102)',
                        'rgb(89, 106, 124)',
                        'rgb(69, 203, 69)',
                        'rgb(16, 72, 90)',
                        'rgb(176, 80, 1)',
                        'rgb(215, 6, 2)',
                        'rgb(137, 187, 127)',
                        'rgb(81, 113, 162)',
                        'rgb(230, 222, 86)',
                        'rgb(82, 239, 17)',
                        'rgb(226, 125, 8)',
                        'rgb(237, 241, 14)',
                        'rgb(40, 67, 192)',
                        'rgb(21, 85, 148)',
                        'rgb(162, 232, 153)',
                        'rgb(213, 45, 249)',
                        'rgb(186, 252, 119)'
                    ],
                    label: 'Sentence'
                }
            ],
            labels: ['A', 'B', 'C', 'D',
                     'E', 'F', 'G', 'H',
                     'I', 'J', 'K', 'L',
                     'M', 'N', 'O', 'P',
                     'Q', 'R', 'S', 'T',
                     'U', 'V', 'W', 'X',
                     'Y', 'Z']
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };

    //wired function
    @wire(getChartSentence, {recordId: '$sentenceId'})
    wiredSentence({data, error}) {
        if(data) {
            this.sentence = data;
            //clear previous data
            this.config.data.datasets[0].data.length = [];

            this.config.data.datasets[0].data.push(data.A__c);
            this.config.data.datasets[0].data.push(data.B__c);
            this.config.data.datasets[0].data.push(data.C__c);
            this.config.data.datasets[0].data.push(data.D__c);
            this.config.data.datasets[0].data.push(data.E__c);
            this.config.data.datasets[0].data.push(data.F__c);
            this.config.data.datasets[0].data.push(data.G__c);
            this.config.data.datasets[0].data.push(data.H__c);
            this.config.data.datasets[0].data.push(data.I__c);
            this.config.data.datasets[0].data.push(data.J__c);
            this.config.data.datasets[0].data.push(data.K__c);
            this.config.data.datasets[0].data.push(data.L__c);
            this.config.data.datasets[0].data.push(data.M__c);
            this.config.data.datasets[0].data.push(data.N__c);
            this.config.data.datasets[0].data.push(data.O__c);
            this.config.data.datasets[0].data.push(data.P__c);
            this.config.data.datasets[0].data.push(data.Q__c);
            this.config.data.datasets[0].data.push(data.R__c);
            this.config.data.datasets[0].data.push(data.S__c);
            this.config.data.datasets[0].data.push(data.T__c);
            this.config.data.datasets[0].data.push(data.U__c);
            this.config.data.datasets[0].data.push(data.V__c);
            this.config.data.datasets[0].data.push(data.W__c);
            this.config.data.datasets[0].data.push(data.X__c);
            this.config.data.datasets[0].data.push(data.Y__c);
            this.config.data.datasets[0].data.push(data.Z__c);

            this.chart.update();

        } else if(error) {
            this.error = error;
        }
    }

    updateChart() {
        
        this.chart.update();
        
    }

    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }

        Promise.all([
            loadScript(this, chartjs + '/Chart.min.js'),
            loadStyle(this, chartjs + '/Chart.min.css')
        ])
            .then(() => {
                // disable Chart.js CSS injection
                window.Chart.platform.disableCSSInjection = true;

                const canvas = document.createElement('canvas');
                this.template.querySelector('div.chart').appendChild(canvas);
                const ctx = canvas.getContext('2d');
                this.chart = new window.Chart(ctx, this.config);
            })
            .catch((error) => {
                this.error = error;
                alert(this.error);
            });

            
        this.chartjsInitialized = true;
    }
}