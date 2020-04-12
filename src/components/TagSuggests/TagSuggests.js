import React from 'react'

import './TagSuggests.css'

class TagSuggests extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            brandSpec: this.props.brandSpec,
            tags: [
                'internet',
                'web',
                'cars',
                'e-commerce',
                'design',
                'software',
                'mobile',
                'phones'
            ],
            suggestedTags: this.props.tags   
        }
        this.setTags = this.setTags.bind(this)
    }

    setTags(){
        this.props.setTags(this.props.brandSpec)
        if (this.props.tags) {
            this.setState({
                suggestedTags: this.props.tags
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.brandSpec !== prevState.brandSpec) {
            return { brandSpec: nextProps.brandSpec }
        }
        /*if (nextProps.tags !== prevState.suggestedTags) {
            this.props.setTags(this.props.brandSpec)
        }*/
        else return null
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.brandSpec !== this.props.brandSpec)
    }
    
    componentDidUpdate(prevProps, prevState) {
        this.setTags()
        if (prevProps.brandSpec !== this.props.brandSpec || prevProps.tags !== this.props.tags) {
            this.setState({brandSpec: this.props.brandSpec,
                suggestedTags: this.props.tags}, () => this.setTags())
        }
    }

    render() {
        return (
            <div>
                {this.setTags}
                {this.state.suggestedTags}
            </div>
        )
    }
}

export default TagSuggests