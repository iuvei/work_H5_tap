/*
 * Element
 * {
 *     actions: array,
 *     actionIndex: int,
 *     currentAction: Action,
 *     currentActionSalvaged: boolean,
 *     target: Laya.Node,
 *     paused: boolean
 * }
 */
ACTION_TAG_INVALID = -1;

var ActionManager = (function(_super) {
    function ActionManager() {
        ActionManager.super(this);

        this._guid = 1;
        this._targets = {};
        this._currentTarget = null;
        this._currentTargetSalvaged = false;

        this.init();
    }

    Laya.class(ActionManager, "ActionManager", _super);

    ActionManager.prototype.init = function() {
        Laya.stage.frameLoop(1, this, this.update);
    };

    ActionManager.prototype.uuid = function() {
        return this._guid++;
    };

    ActionManager.prototype.getTargetGUID = function(target) {
        return target.$_NARWHALE_GUID || (target.$_NARWHALE_GUID = this.uuid());
    };

    ActionManager.prototype.addElement = function(target, element) {
        var uuid = this.getTargetGUID(target);
        this._targets[uuid] = element;
    };

    ActionManager.prototype.delElement = function(target) {
        var uuid = this.getTargetGUID(target);
        delete this._targets[uuid];
    };

    ActionManager.prototype.getElement = function(target) {
        var uuid = this.getTargetGUID(target);
        return this._targets[uuid];
    };

    ActionManager.prototype.add = 
    ActionManager.prototype.addAction = function(action, target, complete, paused) {
        complete = complete || null;
        paused = paused || false;
        var element = this.getElement(target);
        if (element == null) {
            element = {
                actions: [],
                actionIndex: 0,
                currentAction: null,
                currentActionSalvaged: false,
                target: target,
                paused: paused,
                complete: complete
            };

            this.addElement(target, element);
        }

        element.actions.push(action);

        action.startWithTarget(target);
    };

    ActionManager.prototype.remove =
    ActionManager.prototype.removeAction = function(action) {
        if (action == null) {
            return;
        }

        var target = action.getOriginalTarget();
        var element = this.getElement(target);
        if (element != null) {
            if (element.complete) {
                element.complete.run();
            }

            var index = element.actions.indexOf(action);
            if (index != -1) {
                this.removeActionAtIndex(index, element);
            }
        }
    };

    ActionManager.prototype.removeAllActions = function() {
        var locTargets = this._targets;
        for (var i = 0; i < locTargets.length; i++) {
            var element = locTargets[i];
            if (element)
                this.removeAllActionsFromTarget(element.target, true);
        }
    };

    ActionManager.prototype.removeAllActionsFromTarget = function(target, forceDelete) {
        if (target == null)
            return;
        var element = this.getElement(target);
        if (element) {
            if (element.actions.indexOf(element.currentAction) !== -1 && !(element.currentActionSalvaged))
                element.currentActionSalvaged = true;

            element.actions.length = 0;
            if (this._currentTarget == element && !forceDelete) {
                this._currentTargetSalvaged = true;
            } else {
                this.delElement(element);
            }
        }
    };

    ActionManager.prototype.removeActionAtIndex = function(index, element) {
        var action = element.actions[index];

        if (action == element.currentAction && (!element.currentActionSalvaged)) {
             element.currentActionSalvaged = true;
        }

        element.actions.splice(index, 1);
        
        if (element.actionIndex >= index) {
            element.actionIndex--;
        }

        if (element.actions.length == 0) {
            if (this._currentTarget == element) {
                this._currentTargetSalvaged = true;
            }
            else {
                this.delElement(target);
            }
        }
    };

    ActionManager.prototype.removeActionByTag = function(tag, target) {
        if(tag == ACTION_TAG_INVALID)
            console.log("LogInfos.ActionManager_addAction");

        var element = this.getElement(target);

        if (element) {
            var limit = element.actions.length;
            for (var i = 0; i < limit; ++i) {
                var action = element.actions[i];
                if (action && action.getTag() === tag && action.getOriginalTarget() == target) {
                    this.removeActionAtIndex(i, element);
                    break;
                }
            }
        }
    };

    ActionManager.prototype.getActionByTag = function(tag, target) {
        if(tag == ACTION_TAG_INVALID)
            console.log("LogInfos.ActionManager_getActionByTag");

        var element = this.getElement(target);
        if (element) {
            if (element.actions != null) {
                for (var i = 0; i < element.actions.length; ++i) {
                    var action = element.actions[i];
                    if (action && action.getTag() === tag)
                        return action;
                }
            }

        }
        return null;
    };

    ActionManager.prototype.numberOfRunningActionsInTarget = function(target) {
        var element = this.getElement(target);

        if (element)
            return (element.actions) ? element.actions.length : 0;

        return 0;
    };

    ActionManager.prototype.pauseTarget = function(target) {
        var element = this.getElement(target);
        if (element)
            element.paused = true;
    };

    ActionManager.prototype.resumeTarget = function(target) {
        var element = this.getElement(target);
        if (element)
            element.paused = false;
    };

    ActionManager.prototype.pauseAllRunningActions = function(target) {
        var idsWithActions = [];
        var locTargets = this._targets;
        for(var i = 0; i< locTargets.length; i++){
            var element = locTargets[i];
            if(element && !element.paused){
                element.paused = true;
                idsWithActions.push(element.target);
            }
        }
        return idsWithActions;
    };

    ActionManager.prototype.resumeTargets = function(targetsToResume) {
        if(!targetsToResume)
            return;

        for(var i = 0 ; i< targetsToResume.length; i++){
            if(targetsToResume[i])
                this.resumeTarget(targetsToResume[i]);
        }
    };

    ActionManager.prototype.update = function() {
        var delta = Laya.timer.delta/1000;
        var keys = Object.keys(this._targets);
        for (var i = 0, size = keys.length; i < size; i++) {
            var target = keys[i];
            var element = this._currentTarget = this._targets[target];
            this._currentTargetSalvaged = false;

            if (!element.paused) {
                for (element.actionIndex = 0; element.actionIndex < element.actions.length; element.actionIndex++) {
                    element.currentAction = element.actions[element.actionIndex];

                    if (element.currentAction == null) {
                        continue;
                    }

                    element.currentActionSalvaged = false;
                    element.currentAction.step(delta);

                    if (element.currentActionSalvaged) {
                        //element.currentAction.release();
                    }
                    else if (element.currentAction.isDone()) {
                        element.currentAction.stop();
                        this.removeAction(element.currentAction);
                    }

                    element.currentAction = null;
                }
            }


            if (this._currentTargetSalvaged && element.actions.length == 0) {
                this.delElement(target);
            }
        }
    };

    ActionManager.prototype.runAction = function(action, target, complete, paused) {
        this.addAction(action, target, complete, paused);
    };

    ActionManager.prototype.stopAllActions = function(target) {
        this.removeAllActionsFromTarget(target);
    };

    ActionManager.prototype.stopAction = function(action) {
        this.removeAction(action);
    };

    return ActionManager;
} (laya.events.EventDispatcher));